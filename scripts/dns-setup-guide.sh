#!/bin/bash
# Interactive DNS Setup Guide for baltzakisthemis.com
# This script helps you verify DNS configuration for Amplify

set -euo pipefail

echo "🌐 DNS Setup Guide for baltzakisthemis.com"
echo "=========================================="
echo ""

# Check current DNS status
echo "📊 Current DNS Status:"
echo "----------------------"

# Check certificate verification
echo ""
echo "🔐 Certificate Verification Record:"
CERT_EXISTS=$(dig +short "_0e039e45538d56139f5cbafb63772fb6.baltzakisthemis.com" CNAME 2>/dev/null || echo "")
if [[ -n "$CERT_EXISTS" && "$CERT_EXISTS" == *"_59aca9eab2554f64622dea83d91f6661.jkddzztszm.acm-validations.aws."* ]]; then
    echo "✅ Certificate CNAME record is configured correctly"
else
    echo "❌ Certificate CNAME record is missing or incorrect"
    echo "   📝 You need to add this record at your domain registrar:"
    echo "      Type: CNAME"
    echo "      Name: _0e039e45538d56139f5cbafb63772fb6"
    echo "      Value: _59aca9eab2554f64622dea83d91f6661.jkddzztszm.acm-validations.aws."
fi

# Check root domain
echo ""
echo "🏠 Root Domain (baltzakisthemis.com):"
# Check for A record alias to CloudFront (since CNAME not allowed at apex)
ROOT_ALIAS=$(aws route53 list-resource-record-sets --hosted-zone-id Z07653881K06G7GITP1GP --query 'ResourceRecordSets[?Name==`baltzakisthemis.com.` && Type==`A`].AliasTarget.DNSName' --output text 2>/dev/null || echo "")
if [[ -n "$ROOT_ALIAS" && "$ROOT_ALIAS" == *"d1jlm1xvmrlq48.cloudfront.net"* ]]; then
    echo "✅ Root domain A record (alias) is configured correctly"
else
    echo "❌ Root domain A record (alias) is missing or incorrect"
    echo "   📝 You need to add this record in Route 53:"
    echo "      Type: A (Alias)"
    echo "      Name: @ (or leave blank)"
    echo "      Alias Target: d1jlm1xvmrlq48.cloudfront.net"
    echo "      Hosted Zone ID: Z2FDTNDATAQYW2"
fi

# Check www subdomain
echo ""
echo "🌐 WWW Subdomain (www.baltzakisthemis.com):"
WWW_EXISTS=$(dig +short "www.baltzakisthemis.com" CNAME 2>/dev/null || echo "")
if [[ -n "$WWW_EXISTS" && "$WWW_EXISTS" == *"d1jlm1xvmrlq48.cloudfront.net"* ]]; then
    echo "✅ WWW CNAME record is configured correctly"
else
    echo "❌ WWW CNAME record is missing or incorrect"
    echo "   📝 You need to add this record at your domain registrar:"
    echo "      Type: CNAME"
    echo "      Name: www"
    echo "      Value: d1jlm1xvmrlq48.cloudfront.net"
fi

# Check Amplify domain status
echo ""
echo "🔗 Amplify Domain Association:"
DOMAIN_STATUS=$(aws amplify list-domain-associations --app-id dcwmv1pw85f0j --query 'domainAssociations[0].domainStatus' --output text 2>/dev/null || echo "ERROR")
if [[ "$DOMAIN_STATUS" == "AVAILABLE" ]]; then
    echo "✅ Domain is associated with Amplify app"
else
    echo "❌ Domain association issue: $DOMAIN_STATUS"
fi

# Check verification status
echo ""
echo "✨ Domain Verification Status:"
VERIFIED_ROOT=$(aws amplify list-domain-associations --app-id dcwmv1pw85f0j --query 'domainAssociations[0].subDomains[?subDomainSetting.prefix==`""`].verified' --output text 2>/dev/null || echo "false")
VERIFIED_WWW=$(aws amplify list-domain-associations --app-id dcwmv1pw85f0j --query 'domainAssociations[0].subDomains[?subDomainSetting.prefix==`www`].verified' --output text 2>/dev/null || echo "false")

if [[ "$VERIFIED_ROOT" == "True" ]]; then
    echo "✅ Root domain (baltzakisthemis.com) is verified and ready"
else
    echo "⏳ Root domain (baltzakisthemis.com) is not yet verified"
fi

if [[ "$VERIFIED_WWW" == "True" ]]; then
    echo "✅ WWW subdomain (www.baltzakisthemis.com) is verified and ready"
else
    echo "⏳ WWW subdomain (www.baltzakisthemis.com) is not yet verified"
fi

# Test site access
echo ""
echo "🌍 Site Accessibility Test:"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 https://baltzakisthemis.com 2>/dev/null || echo "000")
if [[ "$HTTP_STATUS" == "200" ]]; then
    echo "✅ Site is live and accessible (HTTP $HTTP_STATUS)"
elif [[ "$HTTP_STATUS" == "000" ]]; then
    echo "❌ Site is not accessible (connection timeout)"
else
    echo "⏳ Site returned HTTP $HTTP_STATUS (may still be propagating)"
fi

echo ""
echo "📋 NEXT STEPS:"
echo "=============="

MISSING_RECORDS=false
if [[ -z "$CERT_EXISTS" || "$CERT_EXISTS" != *"_59aca9eab2554f64622dea83d91f6661.jkddzztszm.acm-validations.aws."* ]]; then
    echo "1. 🚨 Add the Certificate Verification CNAME record (most important!)"
    MISSING_RECORDS=true
fi

if [[ -z "$ROOT_ALIAS" || "$ROOT_ALIAS" != *"d1jlm1xvmrlq48.cloudfront.net"* ]]; then
    echo "2. 📝 Add the Root Domain A record (alias)"
    MISSING_RECORDS=true
fi

if [[ -z "$WWW_EXISTS" || "$WWW_EXISTS" != *"d1jlm1xvmrlq48.cloudfront.net"* ]]; then
    echo "3. 📝 Add the WWW CNAME record"
    MISSING_RECORDS=true
fi

if [[ "$MISSING_RECORDS" == "true" ]]; then
    echo ""
    echo "🔄 After adding DNS records:"
    echo "   • Wait 5-30 minutes for DNS propagation"
    echo "   • Run this script again: ./scripts/verify-dns-setup.sh"
    echo "   • Check Amplify Console for domain verification status"
else
    echo "🎉 All DNS records appear to be configured!"
    echo "   • Wait for SSL certificate to be issued (5-15 minutes)"
    echo "   • Domain should be fully verified soon"
    echo "   • Your site will be live at https://baltzakisthemis.com"
fi

echo ""
echo "🔗 Useful Links:"
echo "   • Amplify Console: https://console.aws.amazon.com/amplify/"
echo "   • Domain Status: Check 'Domain management' in your app"
echo "   • DNS Propagation: https://dnspropagation.net/"
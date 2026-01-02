#!/bin/bash
# DNS Verification Script for baltzakisthemis.com
# Run this after updating your DNS records

echo "🔍 Verifying DNS configuration for baltzakisthemis.com"
echo "=================================================="

# Check certificate verification record
echo ""
echo "1. Certificate Verification Record:"
CERT_RECORD=$(dig +short "_0e039e45538d56139f5cbafb63772fb6.baltzakisthemis.com" CNAME)
if [[ "$CERT_RECORD" == *"_59aca9eab2554f64622dea83d91f6661.jkddzztszm.acm-validations.aws."* ]]; then
    echo "✅ Certificate CNAME record is correct"
else
    echo "❌ Certificate CNAME record is missing or incorrect"
    echo "   Expected: _59aca9eab2554f64622dea83d91f6661.jkddzztszm.acm-validations.aws."
    echo "   Found: $CERT_RECORD"
fi

# Check root domain record
echo ""
echo "2. Root Domain (apex) Record:"
ROOT_RECORD=$(dig +short "baltzakisthemis.com" CNAME)
if [[ "$ROOT_RECORD" == *"dtxzcxrjfr622.cloudfront.net"* ]]; then
    echo "✅ Root domain CNAME record is correct"
else
    echo "❌ Root domain CNAME record is missing or incorrect"
    echo "   Expected: dtxzcxrjfr622.cloudfront.net"
    echo "   Found: $ROOT_RECORD"
fi

# Check www subdomain record
echo ""
echo "3. WWW Subdomain Record:"
WWW_RECORD=$(dig +short "www.baltzakisthemis.com" CNAME)
if [[ "$WWW_RECORD" == *"dtxzcxrjfr622.cloudfront.net"* ]]; then
    echo "✅ WWW CNAME record is correct"
else
    echo "❌ WWW CNAME record is missing or incorrect"
    echo "   Expected: dtxzcxrjfr622.cloudfront.net"
    echo "   Found: $WWW_RECORD"
fi

# Check Amplify domain status
echo ""
echo "4. Amplify Domain Status:"
DOMAIN_STATUS=$(aws amplify list-domain-associations --app-id dcwmv1pw85f0j --query 'domainAssociations[0].domainStatus' --output text 2>/dev/null)
if [[ "$DOMAIN_STATUS" == "AVAILABLE" ]]; then
    echo "✅ Domain is associated with Amplify"
else
    echo "❌ Domain association issue: $DOMAIN_STATUS"
fi

# Check subdomain verification
echo ""
echo "5. Subdomain Verification:"
VERIFIED_ROOT=$(aws amplify list-domain-associations --app-id dcwmv1pw85f0j --query 'domainAssociations[0].subDomains[?subDomainSetting.prefix==`""`].verified' --output text 2>/dev/null)
VERIFIED_WWW=$(aws amplify list-domain-associations --app-id dcwmv1pw85f0j --query 'domainAssociations[0].subDomains[?subDomainSetting.prefix==`www`].verified' --output text 2>/dev/null)

if [[ "$VERIFIED_ROOT" == "True" ]]; then
    echo "✅ Root domain (baltzakisthemis.com) is verified"
else
    echo "❌ Root domain (baltzakisthemis.com) is not verified"
fi

if [[ "$VERIFIED_WWW" == "True" ]]; then
    echo "✅ WWW subdomain (www.baltzakisthemis.com) is verified"
else
    echo "❌ WWW subdomain (www.baltzakisthemis.com) is not verified"
fi

# Test site access
echo ""
echo "6. Site Access Test:"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://baltzakisthemis.com 2>/dev/null)
if [[ "$HTTP_STATUS" == "200" ]]; then
    echo "✅ Site is accessible (HTTP $HTTP_STATUS)"
else
    echo "❌ Site is not accessible (HTTP $HTTP_STATUS)"
fi

echo ""
echo "=================================================="
echo "📝 Summary:"
echo "- Update DNS records at your domain registrar"
echo "- Wait 5-30 minutes for DNS propagation"
echo "- Run this script again to verify"
echo "- Once all checks are ✅, your site will be live!"
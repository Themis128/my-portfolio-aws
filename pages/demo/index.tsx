"use client";

import * as React from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Collection,
  Divider,
  Flex,
  Heading,
  Image,
  Rating,
  SelectField,
  StepperField,
  SwitchField,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { PAINTINGS } from "@/lib/paintings";

export default function DemoPage() {
  const [currentPainting, setCurrentPainting] = React.useState(PAINTINGS[0]);
  const [image, setImage] = React.useState(PAINTINGS[0].src);
  const [frame, setFrame] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleAddToCart = () => {
    if (size === "") {
      setError(true);
      return;
    }
    alert(
      `Added to cart!\n${quantity} ${size} "${currentPainting.title}" by ${
        currentPainting.artist
      } with ${frame ? "a" : "no"} frame`,
    );
  };

  return (
    <View
      width="100%"
      maxWidth="50rem"
      padding={{ base: 0, large: "2rem" }}
      as="main"
      aria-label="Art gallery shopping experience"
    >
      <Card variation="outlined" role="region" aria-labelledby="painting-title">
        <Flex
          direction={{ base: "column", large: "row" }}
          justifyContent="space-evenly"
        >
          <Flex
            direction="column"
            gap="5rem"
            alignItems="center"
            as="section"
            aria-label="Product images"
          >
            <View
              width="15rem"
              height="19rem"
              role="img"
              aria-label={`Main image: ${currentPainting.title} by ${currentPainting.artist}`}
            >
              <Image
                src={image}
                alt={`${currentPainting.title} abstract painting by ${currentPainting.artist}`}
                width="100%"
                height="21rem"
                border={frame ? "3px solid black" : ""}
              />
            </View>
            <Collection
              type="grid"
              items={PAINTINGS}
              templateColumns="1fr 1fr 1fr 1fr"
              templateRows="1fr 1fr"
              width="14rem"
              as="nav"
              aria-label="Painting thumbnails"
            >
              {(item, index) => (
                <Flex
                  width="100%"
                  onMouseOver={() => setImage(item.src)}
                  onMouseLeave={() => setImage(currentPainting.src)}
                  key={index}
                  justifyContent="center"
                >
                  <Image
                    src={item.src}
                    alt={`${item.title} abstract painting by ${item.artist} - click to view details`}
                    width="2rem"
                    height="2.5rem"
                    onClick={() => setCurrentPainting(item)}
                    borderRadius="5px"
                    padding="3px"
                    marginBottom="1rem"
                    style={{
                      cursor: "pointer",
                      ...(currentPainting.src === item.src && {
                        border: "1px solid #e77600",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 8px",
                      }),
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setCurrentPainting(item);
                      }
                    }}
                  />
                </Flex>
              )}
            </Collection>
          </Flex>
          <Flex
            direction="column"
            justifyContent="space-between"
            as="section"
            aria-labelledby="product-details"
          >
            <Heading level={4} id="product-details" className="sr-only">
              Product Details
            </Heading>
            <Flex direction="column" gap="0.7rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Heading level={3} id="painting-title">
                  {currentPainting.title}
                </Heading>
                <Flex height="1.8rem" role="group" aria-label="Product badges">
                  {currentPainting.bestSeller ? (
                    <Badge variation="success" aria-label="Bestseller">
                      Bestseller
                    </Badge>
                  ) : null}
                  {currentPainting.isNew ? (
                    <Badge variation="info" aria-label="New product">
                      New
                    </Badge>
                  ) : null}
                  {currentPainting.limitedSupply ? (
                    <Badge variation="warning" aria-label="Limited supply">
                      Limited supply
                    </Badge>
                  ) : null}
                </Flex>
              </Flex>
              <Text fontWeight="bold" aria-label="Artist name">
                {currentPainting.artist}
              </Text>
              <Flex
                direction={{ base: "column", large: "row" }}
                alignItems="baseline"
                role="group"
                aria-label="Product rating and reviews"
              >
                <Rating
                  value={currentPainting.avgRating}
                  fillColor="#f4a41d"
                  aria-label={`Rating: ${currentPainting.avgRating} out of 5 stars`}
                />
                <Text fontSize="small" fontWeight="lighter">
                  {currentPainting.reviews} reviews
                </Text>
              </Flex>
              <Divider />
              <Flex
                alignItems="baseline"
                role="group"
                aria-label="Product pricing"
              >
                <Text fontSize="medium" fontWeight="bold">
                  Price:
                </Text>
                <Text
                  fontSize="large"
                  color="#B12704"
                  fontWeight="bold"
                  aria-label={`Price: ${currentPainting.price}`}
                >
                  {currentPainting.price}
                </Text>
              </Flex>
              <Text
                fontSize="small"
                paddingBottom="1rem"
                aria-label="Product description"
              >
                {currentPainting.description}
              </Text>
              {currentPainting.readyForPickup ? (
                <Text aria-live="polite">
                  <Text variation="success" as="span">
                    Ready within 2 hours
                  </Text>{" "}
                  for pickup inside the store
                </Text>
              ) : null}
              <SwitchField
                label={frame ? "Frame" : "No frame"}
                labelPosition="end"
                isChecked={frame}
                onChange={(e) => {
                  setFrame(e.target.checked);
                }}
                isDisabled={!currentPainting.inStock}
                aria-describedby="frame-description"
              />
              <Text id="frame-description" fontSize="small" className="sr-only">
                Toggle to add or remove a frame from your painting
              </Text>
              <SelectField
                label="Size"
                labelHidden
                variation="quiet"
                placeholder="Select your size"
                value={size}
                onChange={(e) => {
                  e.target.value !== "" && setError(false);
                  setSize(e.target.value);
                }}
                hasError={error}
                errorMessage="Please select a size."
                isDisabled={!currentPainting.inStock}
                aria-label="Select painting size"
                aria-describedby={error ? "size-error" : undefined}
              >
                <option value="Small">Small (12x16")</option>
                <option value="Medium">Medium (18x24")</option>
                <option value="Large">Large (24x36")</option>
                <option value="X-Large" disabled>
                  X-Large (30x40")
                </option>
              </SelectField>
              {!currentPainting.inStock ? (
                <Alert variation="error" role="alert" aria-live="assertive">
                  Out of stock!
                </Alert>
              ) : null}
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={{ base: "column", large: "row" }}
              as="section"
              aria-labelledby="purchase-section"
            >
              <Heading level={4} id="purchase-section" className="sr-only">
                Purchase Options
              </Heading>
              <Flex
                alignItems="center"
                gap="5px"
                role="group"
                aria-label="Quantity selection"
              >
                <Text>Qty:</Text>
                <StepperField
                  label="Quantity"
                  value={quantity}
                  onStepChange={setQuantity}
                  min={0}
                  max={10}
                  step={1}
                  labelHidden
                  width="10rem"
                  isDisabled={!currentPainting.inStock}
                  aria-label="Select quantity"
                />
              </Flex>
              <Button
                variation="primary"
                onClick={handleAddToCart}
                disabled={!currentPainting.inStock || !quantity}
                aria-describedby={
                  !currentPainting.inStock
                    ? "stock-status"
                    : !quantity
                      ? "quantity-status"
                      : undefined
                }
              >
                Add to Cart
              </Button>
              {!currentPainting.inStock && (
                <Text id="stock-status" className="sr-only">
                  Item is out of stock
                </Text>
              )}
              {!quantity && (
                <Text id="quantity-status" className="sr-only">
                  Please select a quantity
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
}

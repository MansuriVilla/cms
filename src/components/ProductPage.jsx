import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PRODUCT_QUERY = `
  query ProductQuery($id: ItemId) {
    product(filter: { id: { eq: $id } }) {
      id
      productname
      productprice
      productlink
      productimage {
        url
      }
    }
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch("https://graphql.datocms.com/", {
          method: "POST",
          headers: {
            Authorization: `cc219343274d5d6a72215dd7b01d82`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: PRODUCT_QUERY,
            variables: { id },
          }),
        });

        const { data } = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{product.productname}</h1>
      {product.productimage?.length > 0 ? (
        product.productimage.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`${product.productname} image ${index + 1}`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ))
      ) : (
        <p>No image available</p>
      )}
      <p>Price: ${product.productprice}</p>
      <a href={product.productlink} target="_blank" rel="noopener noreferrer">
        Buy Now
      </a>
    </div>
  );
};

export default ProductPage;

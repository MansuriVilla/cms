import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PRODUCTS_QUERY = `
  query {
    allProducts {
      id
      productname
      productprice
      productimage {
        url
      }
    }
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://graphql.datocms.com/", {
          method: "POST",
          headers: {
            Authorization: `cc219343274d5d6a72215dd7b01d82`, // Replace with your API token
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: PRODUCTS_QUERY,
          }),
        });

        const { data } = await response.json();
        console.log("Fetched products:", data);
        setProducts(data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.productname}</h2>
          {/* Loop through the productimage array to display all images */}
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
          <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Products;

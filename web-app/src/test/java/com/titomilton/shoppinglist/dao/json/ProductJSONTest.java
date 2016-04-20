package com.titomilton.shoppinglist.dao.json;

import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.titomilton.shoppinglist.entity.Price;
import com.titomilton.shoppinglist.entity.Product;

public class ProductJSONTest {
	private static final String TEST_JSON_FILE = "src/test/resources/products.json";

	private ProductJSON productJSON = new ProductJSON(TEST_JSON_FILE);

	@Before
	public void setUp() {
		productJSON = new ProductJSON(TEST_JSON_FILE);
	}

	@After
	public void tearDown() {
		productJSON = null;
	}

	@Test
	public void testFindAllRelatedProducts() {

		List<Product> products = productJSON.getProducts("straw");

		assertTrue("Total is " + products.size() + " but should be 2", products.size() == 2);

		assertTrue("Product 'Greek Yorgut Strawberry' not found",
				products.get(0).getName().equals("Greek Yorgut Strawberry"));
		assertTrue("Product 'Strawberry' not found", products.get(1).getName().equals("Strawberry"));

	}

	@Test
	public void testGetProductsAllPropertiesAreFilled() {
		String productName = "Cream crackers";
		List<Price> listPrice = new ArrayList<Price>();
		BigDecimal value = new BigDecimal(0.26, MathContext.DECIMAL32).setScale(2);
		listPrice.add(new Price(value, "Tesco"));
		Product product = new Product(productName, listPrice);

		List<Product> products = productJSON.getProducts(productName);
		assertTrue("Product '" + productName + "' not found", !products.isEmpty());
		Product foundProduct = products.get(0);

		assertTrue("Found Product (" + foundProduct + ") is different from expected (" + product + ")",
				product.equals(foundProduct));

	}

}

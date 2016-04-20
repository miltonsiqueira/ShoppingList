package com.titomilton.shoppinglist.model;

import java.util.List;

import com.titomilton.shoppinglist.dao.json.ProductJSON;
import com.titomilton.shoppinglist.entity.Product;

public class ProductManager {
	
	public List<Product> getProducts(String name){
		return new ProductJSON().getProducts(name);
	}
	
}

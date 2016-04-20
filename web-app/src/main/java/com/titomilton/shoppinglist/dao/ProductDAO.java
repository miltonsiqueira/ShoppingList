package com.titomilton.shoppinglist.dao;

import java.util.List;

import com.titomilton.shoppinglist.entity.Product;

public interface ProductDAO {
	public List<Product> getProducts(String name);
}

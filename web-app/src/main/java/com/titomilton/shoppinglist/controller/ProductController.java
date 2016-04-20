package com.titomilton.shoppinglist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.titomilton.shoppinglist.entity.Product;
import com.titomilton.shoppinglist.model.ProductManager;

@RestController
public class ProductController {
	
	public ProductController() {
		// TODO Auto-generated constructor stub
		System.out.println("ProductController loaded");
	}
	
	@RequestMapping("/api/product")
	public List<Product> getProducts(@RequestParam(value="name")String name){
		List<Product> products = new ProductManager().getProducts(name); 
		return products;
	}
}

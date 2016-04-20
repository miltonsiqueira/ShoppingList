package com.titomilton.shoppinglist.dao.json;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.titomilton.shoppinglist.dao.ProductDAO;
import com.titomilton.shoppinglist.entity.Product;

public class ProductJSON implements ProductDAO {
	private static final String JSON_FILE_DEFAULT = "/products.json";// "src/main/resources/products.json";
	private final String filePath;
	private final URI uri;
	private final List<Product> products;

	public ProductJSON() {
		this(JSON_FILE_DEFAULT);
	}

	public ProductJSON(String filePath) {
	
		this.filePath = filePath;
		
		try {
			this.uri = new URI(filePath);
			this.products = parseProductsFile();
		} catch (IOException e ) {
			throw new RuntimeException(e);
		} catch (URISyntaxException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public List<Product> getProducts(String name) {
		final String nameLowerCase = name.toLowerCase();
		return products.stream().filter(p -> p.getName().toLowerCase().contains(nameLowerCase))
				.collect(Collectors.toList());
	}

	private List<Product> parseProductsFile() throws FileNotFoundException, IOException {
		InputStream in = getClass().getResourceAsStream(this.filePath);
		List<Product> products = null;
//		try (FileReader fr = new FileReader(filePath)) {		
//		try (FileReader fr = new FileReader(new File(this.uri))) {
		try (Reader fr = new InputStreamReader(in, "UTF-8")) {			
			
			Gson gson = new GsonBuilder().create();

			Type t = new TypeToken<Map<String, List<Product>>>() {
			}.getType();
			Map<String, List<Product>> parsed = gson.fromJson(fr, t);
			
			products = parsed.get("products");

		}

		return products;

	}

}

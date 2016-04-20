package com.titomilton.shoppinglist.entity;

import java.util.List;

public class Product {
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((prices == null) ? 0 : prices.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (prices == null) {
			if (other.prices != null)
				return false;
		} else if (!prices.equals(other.prices))
			return false;
		return true;
	}

	private final String name;
	private final List<Price> prices;

	public Product(String name, List<Price> prices) {
		super();
		this.name = name;
		this.prices = prices;
	}

	public String getName() {
		return name;
	}

	public List<Price> getPrices() {
		return prices;
	}

	@Override
	public String toString() {
		return "Product [name=" + name + ", prices=" + prices + "]";
	}
	
}

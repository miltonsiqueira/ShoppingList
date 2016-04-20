package com.titomilton.shoppinglist.entity;

import java.math.BigDecimal;

public class Price {


	private final BigDecimal value;
	private final String place;

	public Price(BigDecimal value, String place) {
		this.value = value;
		this.place = place;
	}

	public BigDecimal getValue() {
		return value;
	}

	public String getPlace() {
		return place;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((place == null) ? 0 : place.hashCode());
		result = prime * result + ((value == null) ? 0 : value.hashCode());
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
		Price other = (Price) obj;
		if (place == null) {
			if (other.place != null)
				return false;
		} else if (!place.equals(other.place))
			return false;
		if (value == null) {
			if (other.value != null)
				return false;
		} else if (!value.equals(other.value))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Price [value=" + value + ", place=" + place + "]";
	}

}

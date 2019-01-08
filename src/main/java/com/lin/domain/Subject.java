package com.lin.domain;

public interface Subject {
	
	public void add(Collection b);
	
	public void delete(Collection b);
	
	public void notifyObservers();
	
	public void operation();

}

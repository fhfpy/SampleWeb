package com.lin.dao;

public class PuRun implements Runnable {

	private int i = 0;

	public synchronized void run() {
		if (i < 10) {
			System.out.println("PuRun运行" + i);
		}
		i++;
	}
}

package com.lin.domain;

public class Producer implements Runnable {
	private CubbyHole cubbyhole;
	private int number;

	public Producer(CubbyHole c, int number) {
		cubbyhole = c;
		this.number = number;
	}

	public void run() {
		for (int i = 0; i < 10; i++) {
			cubbyhole.put(i);
			System.out.println("生产者 #" + this.number + " put: " + i);
			try {
				Thread.sleep((int) (100));
			} catch (InterruptedException e) {
			}
		}
	}
}

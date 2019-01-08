package com.lin.domain;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
	private AtomicInteger value;

	public int getValue() {
		return value.get();
	}

	public int increment() {
        int v;
        do {
            v = value.get();}
        while (!value.compareAndSet(v, v + 1));
        return v + 1;
    }
}
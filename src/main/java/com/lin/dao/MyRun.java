package com.lin.dao;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.concurrent.Callable;

public class MyRun implements Callable<Integer>,Serializable {

	private int upperBounds;

    public int getUpperBounds() {
		return upperBounds;
	}

	public void setUpperBounds(int upperBounds) {
		this.upperBounds = upperBounds;
	}

	public MyRun(int upperBounds) {
        this.upperBounds = upperBounds;
    }
	
	@Override
	public Integer call() {
		int sum = 0;
		for(int i=0;i<upperBounds;i++) {
			sum+=i;
		}
		System.out.println(sum);
		return sum;
	}
	
	@SuppressWarnings("unchecked")
    public static <T extends Serializable> T clone(T obj) throws Exception {
        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bout);
        oos.writeObject(obj);

        ByteArrayInputStream bin = new ByteArrayInputStream(bout.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bin);
        return (T) ois.readObject();

        // 说明：调用ByteArrayInputStream或ByteArrayOutputStream对象的close方法没有任何意义
        // 这两个基于内存的流只要垃圾回收器清理对象就能够释放资源，这一点不同于对外部资源（如文件流）的释放
    }
}

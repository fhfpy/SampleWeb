package com.lin.domain;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import com.lin.service.SampleService;

public class Common implements Cloneable {

	@Resource
	private SampleService sampleService;

	public static <T extends Serializable> T cloneD(T obj) {
		T cloneObj = null;
		try {
			// 写入字节流
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ObjectOutputStream oos = new ObjectOutputStream(baos);
			oos.writeObject(obj);
			oos.close();

			// 分配内存,写入原始对象,生成新对象
			ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());// 获取上面的输出字节流
			ObjectInputStream ois = new ObjectInputStream(bais);

			// 返回生成的新对象
			cloneObj = (T) ois.readObject();
			ois.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cloneObj;
	}

	public static List<Product> removeDuplicate(List<Product> list) {
		for (int i = 0; i < list.size() - 1; i++) {
			for (int j = list.size() - 1; j > i; j--) {
				if (list.get(j).equals(list.get(i))) {
					list.remove(j);
				}
			}
		}
		return list;
	}
}

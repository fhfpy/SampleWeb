package com.lin.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FullArrangement1 {
	public List<String> list = new ArrayList<>();
	
	public List<String> doFullArrangement(String[] array) {
		/*
		 * 清空list，因为此list是静态的，因此每次排序时都需要清空，否则的话若重复调用排序的方法的话将不会去除重复的排序
		 */
		list.removeAll(list);
		getAllOrder(array, 0, array.length);
		return list;
	}
	
	/**
	 * 
	 * @param start 从start开始，到end结束来全排列数组
	 * @param end
	 */
	private void getAllOrder(Object[] array, int start, int end) {
		if(start == end) {
			//将数组转换成字符串，通过判断list中是否包含该字符串（数组的字符串形式） 来 判断该数组有没有被输出过，从而
			//去除重复的数组排序。
			String arrayStr = Arrays.toString(array);
			if(!list.contains(arrayStr)) {
				list.add(arrayStr);
			} else {
				System.out.println(arrayStr);
			}
			return;
			//System.out.println(Arrays.toString(array));//使用Arrays工具类遍历输出数组元素
		} else {
			for(int i = start; i < end; i++) {
				swap(array, start, i);
				getAllOrder(array, start + 1, end);
				swap(array, i, start);
			}
		}
	}
	
	//数组中的两个元素交换位置
	private void swap(Object[] array, int i, int j) {
		if(i == j) {
			return;
		}
		Object temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

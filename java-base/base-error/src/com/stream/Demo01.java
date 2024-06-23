package com.stream;

import java.util.*;
import java.util.stream.Stream;

public class Demo01 {
    public static void main(String[] args) {

        method01();
        method02();
        method03();
    }

    public static void method01() {
        List<String> list = new ArrayList<>();

        Collections.addAll(list, "胸大", "熊二", "光头强", "张三", "张四");

        Stream<String> stream = list.stream();

        stream.filter(name -> name.startsWith("张")).forEach(System.out::println);

        System.out.println(list);


    }

    public static void method02() {
        Map<String, String> map = new HashMap<>();

        map.put("java", "java基础");
        map.put("mysql", "mysql基础");

        Stream<Map.Entry<String, String>> stream = map.entrySet().stream();

        System.out.println(stream);
    }

    public static void method03() {
        Integer[] arr = {1, 2, 3, 4, 5};
        Stream stream = (Stream) Arrays.stream(arr);

        System.out.println(stream);
    }
}

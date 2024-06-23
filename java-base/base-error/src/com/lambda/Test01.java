package com.lambda;

public class Test01 {
    public static void main(String[] args) {

        show(new ShowHandler() {
            @Override
            public void show(String name) {
                System.out.println("这是普通匿名构成函数 => " + name);
            }
        });


        show((String name) -> {
            System.out.println("这是无参数lambda: " + name);
        });
    }

    public static void show(ShowHandler showHandler) {
        String lam = "lambda + lambda";
        showHandler.show(lam);
    }
}

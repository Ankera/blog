public class LambdaTest01 {
    public static void main(String[] args) {
        Swim swim = new Swim() {

            // 匿名内部内
            @Override
            public void swimming() {
                System.out.println("匿名函数");
            }
        };

        swim.swimming();

        //==========================================
        method1(() -> {
            System.out.println("这是Lambda 写的构造匿名函数");
        });

    }

    public static void method1(Swim swim) {
        swim.swimming();
    }
}

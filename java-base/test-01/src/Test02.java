import java.util.Arrays;

public class Test02 {
    public static void main(String[] args) {
        String str = "hello";
        System.out.println(str.compareTo("hello1"));

        String str1 = "11";
        String str2 = "22";
        String str3 = "33";
        arr(str1, str2, str3);
    }

    public static void arr(String... arg) {
        System.out.println(arg.length - 1);
        arg[arg.length - 1] = "last";
        arg[0] = "hello";
        System.out.println(Arrays.toString(arg));
    }
}
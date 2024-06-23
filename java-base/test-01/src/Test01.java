public class Test01 {
    public static void main(String[] args) {
        System.out.println(Sex.BOY);

        int boyHashCode = System.identityHashCode(Sex.BOY);
        System.out.println("Sex.BOY 的内存地址哈希码是: " + Integer.toHexString(boyHashCode));
    }
}

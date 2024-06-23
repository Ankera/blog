import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class MathTest01 {
    public static void main(String[] args) {
        Collection<String> list = new ArrayList<String>();

        list.add("1");
        list.add("2");
        list.add("hello world");
        list.add("Java");

        System.out.println(list);

        for (String s : list) {
            System.out.println(s);
        }
//        System.out.println(it.next());

        /**
         * Collection
         *      List
         *          Vector
         *          ArrayList
         *          LinkedList
         *      Set
         *
         *  Map
         *
         *  List、Map、Array
         *
         *  数组 + 链表 =  哈希表 JDK1.8 之前
         *
         *  数组 + 链表[红黑树] = 哈希表 JDK1.8 之后
         *        链表8个长度转换为红黑树
         *
         *  三个集合 List Set Map
         */

        for (String s : list) {
            System.out.println(s);
        }
    }
}

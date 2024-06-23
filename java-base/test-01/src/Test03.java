import java.util.*;

public class Test03 {
    public static void main(String[] args) {
        Map<Integer, String> pokerMap = new HashMap<>();
        List<Integer> pokerNumbers = new ArrayList<>();

        String[] colors = {"♠", "♥", "♣", "口"};
        String[] numbers = {"2", "A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3"};
        int index = 0;

        pokerMap.put(0, "大王");
        pokerNumbers.add(index);
        index++;
        pokerMap.put(1, "小王");
        pokerNumbers.add(index);
        index++;

        for (String number : numbers) {
            for (String color : colors) {
                pokerMap.put(index, number + color);
                pokerNumbers.add(index);
                index++;
            }
        }

//        System.out.println(pokerMap);
//        System.out.println(pokerNumbers);

        Collections.shuffle(pokerNumbers);

        System.out.println(pokerNumbers);

        TreeSet<Integer> player1 = new TreeSet<>();
        TreeSet<Integer> player2 = new TreeSet<>();
        TreeSet<Integer> player3 = new TreeSet<>();
        TreeSet<Integer> dp = new TreeSet<>();

        for (int i = 0; i < pokerNumbers.size(); i++) {
            if (i > 50) {
                dp.add(pokerNumbers.get(i));
            } else if (i % 3 == 0) {
                player1.add(pokerNumbers.get(i));
            } else if (i % 3 == 1) {
                player2.add(pokerNumbers.get(i));
            } else {
                player3.add(pokerNumbers.get(i));
            }
        }

        System.out.println(player1);
        System.out.println(player2);
        System.out.println(player3);
        System.out.println(dp);
    }
}

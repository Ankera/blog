import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DTTest01 {
    public static void main(String[] args) {
        Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int day = c.get(Calendar.DAY_OF_MONTH);
        int hour = c.get(Calendar.HOUR_OF_DAY);
        int minute = c.get(Calendar.MINUTE);
        int second = c.get(Calendar.SECOND);
        String str = year + "-" + (month + 1) + "-" + day + " " + hour + ":" + minute + ":" + second;
        System.out.println(str);

        DateFormat dy1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(dy1.format(new Date().getTime()));

        Calendar c1 = Calendar.getInstance();
        int y = c1.get(Calendar.YEAR);
        int m = c1.get(Calendar.MONTH);
        int d = c1.get(Calendar.DAY_OF_MONTH);
        int h = c1.get(Calendar.HOUR_OF_DAY);
        int min = c1.get(Calendar.MINUTE);
        int s = c1.get(Calendar.SECOND);
        System.out.println(y + "-" + m + "-" + d + "-" + h + ":" + min + ":" + s);
    }
}

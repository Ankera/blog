import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExceptionDemo01 {

    private static final Logger LOGGER = LoggerFactory.getLogger("错误日志类");

    public static void main(String[] args) {

        try {
            printInfo("Tom", -10);
        } catch (NullPointerException e) {
            LOGGER.error(e.getMessage());
        } catch (AgeOutOfBoundsException e) {
            LOGGER.error(e.getMessage());
//            e.printStackTrace();
        }
    }

    public static void printInfo(String name, int age) {
        if (name == null || name.isEmpty()) {
            throw new NullPointerException("名字不能为空");
        }

        if (age < 0 || age > 120) {
            throw  new AgeOutOfBoundsException("年龄不正常，必须在(0-120]之间");
        }

        System.out.println(name + "========" + age);
    }
}

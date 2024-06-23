import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {

    private static final Logger LOGGER = LoggerFactory.getLogger("错误日志类");

    public static void main(String[] args) {
        LOGGER.trace("main方法开始执行了");
    }
}
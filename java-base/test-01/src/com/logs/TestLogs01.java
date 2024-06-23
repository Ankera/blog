package com.logs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestLogs01 {

//    public static

    private static Logger logger = LoggerFactory.getLogger("TestLogs01");

    public static void main(String[] args) {

        logger.info("TestLogs01==================");

        show();

        logger.debug("debugger=================11");
    }

    public static void show() {
        logger.info("TestLogs01---show");
    }
}

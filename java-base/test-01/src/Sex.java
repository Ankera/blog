public enum Sex {
    YAO,
    BOY("男孩"),
    GIRL("女孩");

    private String name;

    private Sex() {
        System.out.println("无参数");
    }

    private Sex(String name) {
        System.out.println("有参数" + name);
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

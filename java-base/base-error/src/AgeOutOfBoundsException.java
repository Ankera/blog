public class AgeOutOfBoundsException extends RuntimeException {
    public AgeOutOfBoundsException() {
        super();
    }

    public AgeOutOfBoundsException(String message) {

        super(message);

        System.out.println("==================");
    }
}

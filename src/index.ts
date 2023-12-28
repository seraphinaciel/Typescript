import { init, exit } from "myPackage";

const hello = () => "hi";

class Block {
  constructor(private data: string) {}
  static hello() {
    return "hi";
  }
}

init({
  url: "true",
});

exit(1);

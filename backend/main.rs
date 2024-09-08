extern crate lib;

fn main() {
    let hello = lib::Greeter::new("Hello");
    hello.print("Matt");
    hello.print("Akhil");
    hello.print("Hana");
    hello.print("Alex");
}

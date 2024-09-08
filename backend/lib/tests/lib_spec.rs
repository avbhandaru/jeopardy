extern crate lib;

#[test]
fn test_greeting() {
    let hello = lib::Greeter::new("Prefix");
    assert_eq!("Prefix Rust", hello.format("Rust"));
}

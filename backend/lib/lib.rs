pub struct Greeter {
    greeting: String,
}

impl Greeter {
    pub fn new(greeting: &str) -> Greeter {
        Greeter { greeting: greeting.to_string(), }
    }

    pub fn format(&self, thing: &str) -> String {
        format!("{} {}", &self.greeting, thing)
    }

    pub fn print(&self, thing: &str) {
        println!("{}", self.format(thing));
    }
}

class Key {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(public name: string, private key: Key) {}
  getKey() {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`"${person.name} Вхід дозволено."`);
    } else {
      console.log(`"Двері закриті. ${person.name} Вхід заборонено."`);
    }
  }
  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log('Двері відчинено.');
    } else {
      console.log(`"Неправильний ключ. Двері залишаються закритими."`);
    }
  }
}

const BobKey = new Key();
const JhonKey = new Key();
console.log(BobKey);
console.log(JhonKey);

const Bob = new Person('Bob', BobKey);
console.log(Bob);

const Jhon = new Person('Jhon', JhonKey);
console.log(Jhon);

const BobHouse = new MyHouse(BobKey);
console.log(BobHouse);

BobHouse.openDoor(Jhon.getKey());
BobHouse.comeIn(Jhon);

BobHouse.openDoor(Bob.getKey());
BobHouse.comeIn(Bob);
BobHouse.comeIn(Jhon);

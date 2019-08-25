const statements = [
    {
        id: 1,
        accountId: 1,
        concept: 'Concepto 1',
        amount: 20,
        balance: 100,
    },
    {
        id: 2,
        accountId: 1,
        concept: 'Concepto 2',
        amount: -10,
        balance: 90,
    },
];

const accounts = [
    {
        id: 1,
        balance: 100,
        name: 'Account 1',
        createdAt: '17-08-1985',
    },
    {
        id: 2,
        balance: 300,
        name: 'Account 2',
        createdAt: '17-08-1984',
    },
];

class BaseEntity {
    constructor(values) {
        this.values = values || {};
        return new Proxy(this, {
            set(target, name, value) {
                target.values[name] = value;
                return true;
            },
            get(target, name) {
                return target[name] || target.values[name];
            },
        });
    }
    getValues() {
        return this.values;
    }
}

class StatementEntity extends BaseEntity {
    constructor({id, accountId, concept, amount, balance}) {
        super({id, accountId, concept, amount, balance});
    }
    static findByAccountId(accountId) {
        throw new Error('Not implemented');
    }
}

class StatementEntityMemory extends StatementEntity {
    static findByAccountId(accountId) {
        const statementsFound = statements.filter(
            statement => statement.accountId === accountId,
        );
        return statementsFound.map(statement => new this(statement));
    }
}

class AccountEntity extends BaseEntity {
    constructor({id, name, balance, createdAt}) {
        super({id, name, balance, createdAt});
    }
    validate() {
        if (this.balance !== undefined && this.name !== undefined) {
            return true;
        }
        return false;
    }
    save() {
        throw new Error('Not implemented');
    }
    static findById(id) {
        throw new Error('Not implemented');
    }
}

class AccountEntityMemory extends AccountEntity {
    static findById(id) {
        const accountFound = accounts.find(account => account.id === id);
        return new this(accountFound);
    }
    preSave() {
        this.id = 999;
        this.createdAt = '25-08-2019';
    }
    save() {
        if (this.validate()) {
            this.preSave();
            accounts.push(this.getValues());
        }
    }
    getStatements() {
        return StatementEntityMemory.findByAccountId(this.id);
    }
}

//Object.setPrototypeOf(AccountEntity, AccountEntityMemory);
//AccountEntity.findById = function findById(id) {};

account = new AccountEntityMemory({name: 'test', balance: 0});
//console.log(account.getValues());
account.save();
//console.log(account.getValues());
console.log(AccountEntityMemory.findById(1));
console.log(account.getValues());
console.log(StatementEntityMemory.findByAccountId(1));
console.log(AccountEntityMemory.findById(1).getStatements());

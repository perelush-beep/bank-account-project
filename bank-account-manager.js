const accounts = []

function createIdGenerator() {
    let currentId = 1;
    return function () {
        return currentId++;
    };
}

function createcustomers(name, account, initialBalance) {
    try {
        if (!name || name.trim() === "") {
            throw new Error('name cannot be empty');
        }
        if (typeof initialBalance !== "number" || isNaN(initialBalance)) {
            throw new Error('Balance must be a numeric value');
        }
        if (initialBalance < 0) {
            throw new Error('Balance cannot be negative');
        }
        if (account !== "Regular" && account !== "Premium" && account !== "Student") {
            throw new Error('Invalid account type')
        };
        return {
            id: createIdGenerator(),
            fullName: name,
            accountType: account,
            balance: initialBalance,
            isActive: true
        };
    } catch (error) {
        console.error("Failed to create customers: ", error.message);
        return null
    }
}

function showCustomers() {
    console.log('===== customerss List =====');
    if (account.length === 0) {
        console.log("No customerss found. ");
        return;
    }
    accounts.forEach(customers => {
        const statusText = customers.isActive ? "Active" : "closed";
        console.log('ID: ${customers.id | Name: ${customers.fullName} | Type ${customers.accountType} | Balance: ${customers.balance} | Status: ${status.text}');
    })
}

function deposit(id, amount) {
    const customers = accounts.find(acc => acc.id === id);
    if (customers && customers.isActive && amount > 0) {
        customers.balance += amount;
        console.log("deposit copleted successfully");
    }
    else if (!customers) {
        console.log("Couldn't find this account");
    }
    else if (!customers.isActive) {
        console.log("Account is not active");
    }
    else {
        console.log("You can't deposit a negative amount of money")
    }
}

function withdraw(id, amount) {
    const costumer = accounts.find(acc => acc.id === id);
    if (costumer && costumer.isActive && costumer.balance >= amount && amount > 0) {
        costumer.balance -= amount;
        console.log('Withraw completed successfully');
    }
    else {
        console.log('Withdraw failed: insufficient balance');
    }
}

function searchcustomer(searchTerm) {
    const cleanTerm = String(searchTerm).trim();
    const costumer = accounts.find(acc =>
        String(acc.id) === cleanTerm || acc.fullName.toLowerCase() === cleanTerm.toLowerCase())

    if (costumer) {
        console.log(costumer);
        return costumer;
    }
    else {
        console.log("could'nt find customers");
        return null;
    }
}

function closeAccount(id) {
    const customer = accounts.find(acc => acc.id === id)
    if (!customer) {
        console.log("Couldn't find account");
        return null;
    }
    else {
        console.log('Account been found')
        customer.isActive = false;
        console.log('Account closed successfully')
    }
}

function showStatics() {
    const active = accounts.filter(acc => acc.isActive);
    const totalMoney = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const avgBalance = totalMoney / active.length;
    const allBalance = accounts.map(acc => acc.balance);
    const highest = Math.max(...allBalance);
    console.log('===== Statistics =====');
    console.log(`Total Customers: ${accounts.length}`);
    console.log(`Active Accounts: ${active.length}`);
    console.log(`Total Money: ${totalMoney}`);
    console.log(`Average Balance: ${avgBalance}`);
    console.log(`Highest Balance: ${highest}`);
}




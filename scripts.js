window.onload = function () {
    window.scrollTo(0, 0);

    const rankList = [
        { name: '가1', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가2', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가3', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가4', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가5', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가6', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가7', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가8', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가9', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가10', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가11', rateOfReturn: '+10%', evalPrice: '100,000원' },
    ];

    const ownedStockList = [
        { name: 'A바이오', rateOfReturn: '+10%', stockQuantity: '10주', evalPrice: '100,000원', sellQuantity: 0 },
    ];

    const stockList = [
        { name: 'A바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'B바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'C바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'D바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'E바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'F바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'G바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'H바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'I바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
        { name: 'J바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', quantity: 0 },
    ];

    const rankListElement = document.getElementById('rank-list');
    const stockListElement = document.getElementById('stock-list');
    const ownedStockListElement = document.getElementById('owned-stock-list');

    rankList.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.rateOfReturn}</td>
            <td>${user.evalPrice}</td>
        `;
        rankListElement.appendChild(row);
    });


    ownedStockList.forEach((stock, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.rateOfReturn}</td>
            <td>${stock.stockQuantity}</td>
            <td>${stock.evalPrice}</td>
            <td>
                <div class="quantity-control">
                    <input type="number" id="quantity-${index}" value="0" min="0">
                </div>
            </td>
        `;
        ownedStockListElement.appendChild(row);
    });

    stockList.forEach((stock, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.priorPrice}</td>
            <td>${stock.currentPrice}</td>
            <td>${stock.change}</td>
            <td>
                <div class="quantity-control">
                    <input type="number" id="quantity-${index}" value="0" min="0">
                </div>
            </td>
        `;
        stockListElement.appendChild(row);
    });

    window.buyStock = function (stockName, index) {
        const quantity = document.getElementById(`quantity-${index}`).value;
        alert(`${stockName} 매수! 수량: ${quantity}`);
    };

    window.sellStock = function (stockName, index) {
        const quantity = document.getElementById(`quantity-${index}`).value;
        alert(`${stockName} 매도! 수량: ${quantity}`);
    };

    window.changeQuantity = function (index, delta) {
        const quantityInput = document.getElementById(`quantity-${index}`);
        let newValue = parseInt(quantityInput.value) + delta;
        if (newValue < 0) newValue = 0;
        quantityInput.value = newValue;
    };

    window.toggleTurnEnd = function () {
        const endTurnBtn = document.getElementById('end-turn-btn');
        endTurnBtn.classList.toggle('disabled');
    };
};
window.onload = function () {
    window.scrollTo(0, 0);

    console.log('Page loaded');
    console.log(document.getElementById('owned-stock-list')); // 확인
    console.log(document.getElementById('stock-list')); // 확인



    const ownedStockList = [
        /*        { name: 'A바이오', rateOfReturn: '+10%', stockQuantity: '10주', evalPrice: '100,000원', sellQuantity: 0 },*/
    ];


    const stockList = [
        { name: 'A바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'B바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'C바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'D바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'E바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'F바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'G바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'H바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'I바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
        { name: 'J바이오', currentPrice: '100,000원', priorPrice: '100,000원', change: '+1,000%', buyQuantity: 0 },
    ];

    const stockListElement = document.getElementById('stock-list');
    const ownedStockListElement = document.getElementById('owned-stock-list');

    function renderOwnedStockList() {
        ownedStockListElement.innerHTML = '';
        ownedStockList.forEach((stock, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stock.name}</td>
                <td>${stock.rateOfReturn}</td>
                <td>${stock.stockQuantity}</td>
                <td>${stock.evalPrice}</td>
                <td>
                    <div class="quantity-control">
                        <input type="number" id="sellQuantity-${index}" value="${stock.sellQuantity}" min="0">
                    </div>
                </td>
            `;
            ownedStockListElement.appendChild(row);
        });
    }

    ownedStockList.forEach((stock, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.rateOfReturn}</td>
            <td>${stock.stockQuantity}</td>
            <td>${stock.evalPrice}</td>
            <td>
                <div class="quantity-control">
                    <input type="number" id="sellQuantity-${index}" value="0" min="0">
                </div>
            </td>
        `;
        ownedStockListElement.appendChild(row);
    });

    function addToOwnedStockList(stockName, buyQuantity) {
        const existingStock = ownedStockList.find(stock => stock.name === stockName);
        if (existingStock) {
            const currentQuantity = parseInt(existingStock.stockQuantity.replace('주', ''));
            existingStock.stockQuantity = `${currentQuantity + parseInt(buyQuantity)}주`;
        } else {
            const newStock = {
                name: stockName,
                rateOfReturn: '0%',
                stockQuantity: `${buyQuantity}주`,
                evalPrice: '0원',
                sellQuantity: 0
            };
            ownedStockList.push(newStock);
        }
        renderOwnedStockList();
    }


    stockList.forEach((stock, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.priorPrice}</td>
            <td>${stock.currentPrice}</td>
            <td>${stock.change}</td>
            <td>
                <div class="buyQuantity-control">
                    <input type="number" id="buyQuantity-${index}" value="0" min="0">
                </div>
            </td>
        `;
        stockListElement.appendChild(row);
    });

    function collectStockInfo() {
        let message = "매수 종목 정보:\n";
        stockList.forEach((stock, index) => {
            const buyQuantity = document.getElementById(`buyQuantity-${index}`).value;
            if (buyQuantity > 0) {
                message += `${stock.name}: ${buyQuantity}주\n`;
                addToOwnedStockList(stock.name, buyQuantity);
                document.getElementById(`buyQuantity-${index}`).value = 0; // Reset the quantity input after buying
            }
        });
        if (message === "매수 종목 정보:\n") {
            message = "매수할 종목이 없습니다.";
        }
        alert(message);
    }



    document.getElementById('buy-btn').addEventListener('click', collectStockInfo);
    


    window.buyStock = function (stockName, index) {
        const buyQuantity = document.getElementById(`buyQuantity-${index}`).value;
        alert(`${stockName} 매수! 수량: ${buyQuantity}`);
    };

    window.sellStock = function (stockName, index) {
        const buyQuantity = document.getElementById(`buyQuantity-${index}`).value;
        alert(`${stockName} 매도! 수량: ${buyQuantity}`);
    };

    window.changeBuyQuantity = function (index, delta) {
        const quantityInput = document.getElementById(`buyQuantity-${index}`);
        let newValue = parseInt(quantityInput.value) + delta;
        if (newValue < 0) newValue = 0;
        quantityInput.value = newValue;
    };

    window.changeSellQuantity = function (index, delta) {
        const quantityInput = document.getElementById(`sellQuantity-${index}`);
        let newValue = parseInt(quantityInput.value) + delta;
        if (newValue < 0) newValue = 0;
        quantityInput.value = newValue;
    };

    window.toggleTurnEnd = function () {
        const endTurnBtn = document.getElementById('end-turn-btn');
        endTurnBtn.classList.toggle('disabled');
    };
};
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
                stockQuantity: `${parseInt(buyQuantity)}주`,
                evalPrice: '0원',
                sellQuantity: 0
            };
            ownedStockList.push(newStock);
        }
        renderOwnedStockList();
    }

    function removeToOwnedStockList(stockName, sellQuantity) {
        const existingStock = ownedStockList.find(stock => stock.name === stockName);
        console.log('existingStock:', existingStock);
        if (existingStock) {
            const currentQuantity = parseInt(existingStock.stockQuantity.replace('주', ''));
            const newQuantity = currentQuantity - parseInt(sellQuantity);
            /*
            existingStock.stockQuantity = `${currentQuantity - parseInt(sellQuantity)}주`;
            console.log('test');
            */
            if (newQuantity > 0) {
                existingStock.stockQuantity = `${newQuantity}주`;
            } else {
                // 주식 수가 0 이하가 되면 리스트에서 제거
                const index = ownedStockList.indexOf(existingStock);
                ownedStockList.splice(index, 1);
            }
        }
        /*
        renderOwnedStockList();
        */
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
                message += `${stock.name}: ${parseInt(buyQuantity)}주\n`;
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

    function collectOwnedStockInfo() {
        let message = "매도 종목 정보:\n";
        let hasSoldStock = false; // 매도한 종목이 있는지 확인하는 변수
        let exceededStocks = []; // 매도 수량이 보유 수량을 초과한 종목 리스트

        ownedStockList.forEach((stock, index) => {
            const sellQuantity = document.getElementById(`sellQuantity-${index}`).value;
            const stockQuantity = parseInt(stock.stockQuantity.replace('주', ''));
            console.log('stock:', stock);
            console.log('index:', index);
            console.log('sellQuantity:', sellQuantity);
            console.log('stockQuantity:', stockQuantity);
            if (sellQuantity > 0) {
                if (stockQuantity < sellQuantity) {
                    exceededStocks.push(stock.name); // 초과한 종목을 리스트에 추가
                    /*
                    message = "매도 수량이 보유 수량을 초과할 수 없습니다.";
                    */
                } else {
                    message += `${stock.name}: ${parseInt(sellQuantity)}주\n`;
                    removeToOwnedStockList(stock.name, sellQuantity);
                    document.getElementById(`sellQuantity-${index}`).value = 0; // Reset the quantity input after selling
                    hasSoldStock = true; // 매도한 종목이 있음을 표시
                }
            }
        });
        if (exceededStocks.length > 0) {
            message = "매도 수량이 보유 수량을 초과한 종목:\n" + exceededStocks.join(", ");
        } else if (!hasSoldStock) { // 매도한 종목이 없으면
            message = "매도할 종목이 없습니다.";
        }
        alert(message);
        renderOwnedStockList(); // 모든 매도 작업이 끝난 후 리스트를 한 번만 렌더링
    }



    document.getElementById('sell-btn').addEventListener('click', collectOwnedStockInfo);

    /*
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
    */
    window.toggleTurnEnd = function () {
        const endTurnBtn = document.getElementById('end-turn-btn');
        endTurnBtn.classList.toggle('disabled');
    };
};
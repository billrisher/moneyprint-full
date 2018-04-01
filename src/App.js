import React, { Component } from 'react';
import './App.css';
import Item from './components/Item/Item';

const roundNumber = (number) => {
  return (Math.round(number * 100) / 100 );
};

class App extends Component {
  constructor(props) {
    super (props);
    this.state = {
      score: 0,
      increment: 1,
      itemIncrement: 0,
      bitcoinFarm: {
        name: "Bitcoin Farm",
        quantity: 0,
        basePrice: 15,
        price: 15,
        incAmount: 0.5
      },
      investmentBanker: {
        name: "Investment Banker",
        quantity: 0,
        basePrice: 100,
        price: 100,
        incAmount: 1
      },
      insiderTrader: {
        name: "Insider Trader",
        quantity: 0,
        basePrice: 550,
        price: 550,
        incAmount: 4
      },
      eastEuroConnection: {
        name: "East-Euro Connection",
        quantity: 0,
        basePrice: 1100,
        price: 1100,
        incAmount: 8
      },
      monopoly: {
        name: "Monopoly",
        quantity: 0,
        basePrice: 6000,
        price: 6000,
        incAmount: 12
      },
      planet: {
        name: "An Actual Planet",
        quantity: 0,
        basePrice: 12000,
        price: 12000,
        incAmount: 47
      },
      itemPrice: (item) => {
        return (item.basePrice * Math.pow(1.15, item.quantity));
      },
      addScore: () => {
        this.setState({ score: this.state.score + this.state.increment});
      },
      toggleBuyMenu: () => {
        let buyMenu = document.getElementById("buy-area-mobile");
        let gameArea = document.getElementById("click-area-items");
        if (buyMenu.style.display === "none") {
          buyMenu.style.display = "block";
          gameArea.style.display = "none";
        } else {
          buyMenu.style.display = "none";
          gameArea.style.display = "block";
        }
      },
      buyClickItem: (item) => {
        if (this.state.score >= item.price) {
          this.setState({ score: this.state.score - item.price});
          this.setState({ increment: roundNumber(this.state.increment + item.incAmount)});
          item.quantity++;
          item.price = Math.round((item.basePrice * Math.pow(1.15, item.quantity) * 100) / 100 );
          //this.setState(item);
            }
          },
      buyIdleItem: (item) => {
        if (this.state.score >= item.price) {
          this.setState({ score: this.state.score - item.price});
          this.setState({ itemIncrement: roundNumber(this.state.itemIncrement + item.incAmount)});
          item.quantity++;
          item.price = Math.round((item.basePrice * Math.pow(1.15, item.quantity) * 100) / 100);
          //this.setState(item);
        }
      },
      incrementItem: () => {
        if (this.state.itemIncrement > 0) {
        this.setState({score: roundNumber(this.state.score + this.state.itemIncrement)});
        setTimeout(this.state.incrementItem, 1000);
        } else {
        setTimeout(this.state.incrementItem, 1000);
        }
      },
      saveGame: () => {
        localStorage.setItem('saveData', JSON.stringify(this.state));
        console.log('game saved');
      },
      loadGame: () => {
        this.setState(() => JSON.parse(localStorage.getItem("saveData")));
        console.log(JSON.parse(localStorage.getItem("saveData")));
      },
      resetGame: () => {
        // Useless right now
        return null;
      },
      autoSave: () => {
        this.state.saveGame();
        setTimeout(this.state.autoSave, 30000);
      },
    };
  }
  componentWillMount() {
    if (JSON.parse(localStorage.getItem("saveData")) != null) {
      this.setState(() => JSON.parse(localStorage.getItem("saveData")));
      console.log('game loaded from previous save');
    }
  }
  componentDidMount() {
    this.state.incrementItem();
    this.state.autoSave();
  }
  render() {
    return (
      <div id="body" className="flex vertical">
        <div className="flex" id="site-title">
          <p>Money Print</p>
        </div>
        <div className="flex" id="game-body">
          <div className="flex vertical" id="click-area">
            <div id="click-area-items">
              <p>${this.state.score}</p>
              <button onClick={this.state.addScore}><img src="./money-printer.png" alt="Acquire Currency" /></button>
              <p>$ Per Click: {this.state.increment}</p>
              <p>$ Per Second: {this.state.itemIncrement}</p>
            </div>
            <div className="" id="buy-area-mobile">
              <div id="buy-area-mobile-items">
                <div className="flex outer-box">
                  <Item click={() => this.state.buyClickItem(this.state.bitcoinFarm)} item={this.state.bitcoinFarm}></Item>
                  <Item click={() => this.state.buyIdleItem(this.state.investmentBanker)} item={this.state.investmentBanker}></Item>
                </div>
                <div className="flex outer-box">
                  <Item click={() => this.state.buyClickItem(this.state.insiderTrader)} item={this.state.insiderTrader}></Item>
                  <Item click={() => this.state.buyIdleItem(this.state.eastEuroConnection)} item={this.state.eastEuroConnection}></Item>
                </div>
                <div className="flex outer-box">
                  <Item click={() => this.state.buyClickItem(this.state.monopoly)} item={this.state.monopoly}></Item>
                  <Item click={() => this.state.buyIdleItem(this.state.planet)} item={this.state.planet}></Item>
                </div>
              </div>
          </div>
          </div>
          <div id="desktop-buy-area" className="">
            <div className="flex vertical" id="desktop-items">
              <Item click={() => this.state.buyClickItem(this.state.bitcoinFarm)} item={this.state.bitcoinFarm}></Item>
              <Item click={() => this.state.buyIdleItem(this.state.investmentBanker)} item={this.state.investmentBanker}></Item>
              <Item click={() => this.state.buyClickItem(this.state.insiderTrader)} item={this.state.insiderTrader}></Item>
              <Item click={() => this.state.buyIdleItem(this.state.eastEuroConnection)} item={this.state.eastEuroConnection}></Item>
              <Item click={() => this.state.buyClickItem(this.state.monopoly)} item={this.state.monopoly}></Item>
              <Item click={() => this.state.buyIdleItem(this.state.planet)} item={this.state.planet}></Item>
            </div>
          </div>
        </div>
        <div className="flex" id="mobile-footer">
          <button id="toggle-buy" onClick={this.state.toggleBuyMenu}>Buy Items</button>
        </div>
      </div>
    );
  }
}

export default App;

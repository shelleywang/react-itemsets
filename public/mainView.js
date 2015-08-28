var MainView = React.createClass({
  getInitialState: function() {
    return {data: [], itemSet: []};
  },
  getItemsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.getItemsFromServer();
  },
  updateItemSet: function(newItem) {
    // var newItems = this.state.itemSet.push(newItem);
    this.state.itemSet.push(newItem);
    this.setState({itemSet: this.state.itemSet});
  },
  render: function() {
    return (
      <div id='mainView'>
        <ItemList data={this.state.data} clickToAdd='true' onAddItem={this.updateItemSet}/>
        <CurrentItemSet data={this.state.itemSet} clickToAdd='false'/>
      </div>
    );
  }
});

var ItemList = React.createClass({
  clickHandler: function(item) {
    if (this.props.clickToAdd) {
      this.props.onAddItem(item);
    }
  },
  render: function() {
    var list = this;
    var newData = this.props.data;
    var objectKeys = Object.keys(this.props.data);
    var items = objectKeys.map(function (keyVal) {
      var singleItem = newData[keyVal];
      if (!singleItem['maps'] || singleItem['maps']['1'] === undefined || singleItem['maps']['1']) {
        return (
          <SingleItem key={keyVal} img={singleItem['image']['full']} name={singleItem.name} mainStat={singleItem.group} handleClick={list.clickHandler} >
          </SingleItem>
       );
      }
    });
    return (
      <div id="allItems" >
        {items}
      </div>
    );
  }
});

var SingleItem = React.createClass({
  clickHandler: function(item) {
    this.props.handleClick(item);
  },
  render: function() {
    var singleItem = {name: this.props.name,
                      image: {'full': this.props.img},
                      mainstat: this.props.mainStat};
    if (this.props.mainStat) {
      var stat = <h4 key={this.props.name + 'stat'}>{this.props.mainStat}</h4>
    } else {
      var stat = <h4 key={this.props.name + 'stat'}></h4>
    }

    return (
      <span class="item" onClick={this.clickHandler.bind(null,singleItem)}>
        <img key={this.props.name + 'name'} src={'http://ddragon.leagueoflegends.com/cdn/5.16.1/img/item/'+this.props.img}>
        </img>

      </span>
    ); //removed         {stat}
  }
});

var CurrentItemSet = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  updateItems: function(newItem){
    var allItems = this.state.data.concat([newItem]);
    this.setState({data: allItems});
  },
  render: function() {
    return (
      <div id="itemSet">
      <h4>Build an item set</h4>
      <ItemList data={this.state.data}/>
      </div>
    );
  }
});

React.render(
  <MainView url='items.json'/>,
  document.getElementById('content')
);
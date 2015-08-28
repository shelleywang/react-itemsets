var MainView = React.createClass({
  getInitialState: function() {
    return {data: [], itemSet:[]};
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
    var newItems = this.state.itemSet[1] = newItem;
    this.setState({itemSet: newItems});
    console.log(newItems)
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
  clickHandler: function() {
    if (this.props.clickToAdd) {
      this.props.onAddItem({name:'hello', group:'shelley'});
    }
  },
  render: function() {
    var newData = this.props.data;
    var objectKeys = Object.keys(this.props.data);
    var items = objectKeys.map(function (keyVal) {
      var singleItem = newData[keyVal];
      return (
        <SingleItem key={singleItem.name} name={singleItem.name} mainStat={singleItem.group}>
        </SingleItem>
      );
    });
    return (
      <div id="allItems" onClick={this.clickHandler}>
        {items}
      </div>
    );
  }
});

var SingleItem = React.createClass({
  render: function() {
    return (
      <div class="item">
        <h3>{this.props.name}</h3>
        {this.props.mainStat}
      </div>
    );
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
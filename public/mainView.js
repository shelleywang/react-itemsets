var data = [
  {name: 'Bloodthirster', mainStat: 'ad'},
  {name: 'Deathcap', mainStat: 'ap'},
  {name: 'Heart of gold', mainStat: 'supp'}
];

var MainView = React.createClass({
  render: function() {
    return (
      <div id='mainView'>
        <AllItems data={this.props.data}/>
      </div>
    );
  }
});

var AllItems = React.createClass({
  render: function() {
    var items = this.props.data.map(function (singleItem) {
      return (
        <SingleItem name={singleItem.name} 
        mainStat={singleItem.mainStat}>
        </SingleItem>
      );
    });
    return (
      <div id="allItems" >
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

React.render(
  <MainView data={data}/>,
  document.getElementById('content')
);
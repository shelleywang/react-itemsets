var MainView = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  getItemsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.getItemsFromServer();
  },
  render: function() {
    return (
      <div id='mainView'>
        <AllItems data={this.state.data}/>
        <CurrentItemSet />
      </div>
    );
  }
});

var AllItems = React.createClass({
  render: function() {
    var items = this.props.data.map(function (singleItem) {
      return (
        <SingleItem key={singleItem.name} name={singleItem.name} mainStat={singleItem.mainStat}>
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

var CurrentItemSet = React.createClass({
  render: function() {
    return (
      <div id="itemSet">
      <h4>Build an item set</h4>
      </div>
    );
  }
});

React.render(
  <MainView url='items.json'/>,
  document.getElementById('content')
);
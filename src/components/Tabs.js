//const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const Tab = (props) => {
  
  const { name } = props.tab;
  const { activeTab, changeActiveTab } = props;
  
  return (
    <li className={name === activeTab && "is-active"} onClick={() => changeActiveTab(name)}>
      <a>
        { /* <span className="icon is-small"><i className="fa fa-image"></i></span> */ }
        <span>{name}</span>
      </a>
    </li>
  );
};

class Tabs extends React.Component { 
  static propTypes = {
    tabList: React.PropTypes.array.isRequired,
    activeTab: React.PropTypes.string,
    changeActiveTab: React.PropTypes.func
  };
  
  render() {
    return (
      <div className="tabs">
        <ul>
          { this.props.tabList.map(tab => 
              <Tab  tab={tab}
                    key={tab.name}
                    activeTab={this.props.activeTab}
                    changeActiveTab={this.props.changeActiveTab}
              />
           )}
        </ul>
      </div>
    );
  }
}

export default Tabs;

const ActiveTabContent = (props) => <div>{props.content}</div>;

const tabList = [
  {
    name: "Pictures",
    icon: "",
    content: "Stuff 1"
  }, {
    name: "Music",
    icon: "",
    content: "Stuff 2"
  }, {
    name: "Videos",
    icon: "",
    content: "Stuff 3"
  }, {
    name: "Documents",
    icon: "",
    content: "Stuff 4"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeTab: "Pictures"
    };
  }

  changeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }
  
  activeTabContent() {
    const activeIndex = tabList.findIndex((tab) => {
      return tab.name === this.state.activeTab;
    });
    
    return tabList[activeIndex].content;
  }
  
  render() {    
    return (
      <section className="section">
        <div className="container">
          <Tabs tabList={tabList}
                activeTab={this.state.activeTab}
                changeActiveTab={this.changeActiveTab.bind(this)}
           />
          
            <ReactCSSTransitionGroup
              className="tabs-content"
              component="div"
              transitionName="fade"
              transitionEnterTimeout={0}
              transitionLeaveTimeout={150}
            >
              <ActiveTabContent key={this.state.activeTab} content={this.activeTabContent()} />
            </ReactCSSTransitionGroup>
          
        </div>
      </section>
    );
  }
}

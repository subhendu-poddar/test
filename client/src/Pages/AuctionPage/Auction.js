import React, { Component } from 'react';
import axios from 'axios';

class Auction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            bidAmount: this.props.player.baseBidAmount,
            teamFixed: false,
            priceFixed: false,
            selected: '',
            sold_team: '',
            playerSold: false,
            data: [{}]
        }
    }

    componentDidMount = () => {
        this.getTeams()
    }

    getTeams = () => {

        axios.get(`/team/allTeams`)
            .then((response) => {
                const data = response.data;
                this.setState({ teams: data });
                //console.log("team data Received", data);
            })
            .catch(() => {
                console.log("Teams Not Received");
            });
    }

    teamList = () => {
        const teams = this.state.teams
        if (!teams.length) return null;

        return (
            <div>
                {teams.map((team, index) => (
                    <div key={index}>
                        <button className="team_btn"
                            onClick={() =>
                                this.setState({
                                    selected: team,
                                    teamFixed: true,
                                    teams: []
                                })
                            }
                        >
                            {team.teamName}
                        </button>
                    </div>
                ))}
            </div>
        )
    }


    inc = () => {
        let value = this.state.bidAmount
        let newValue = value + (value < 1000 ? 100 : value < 2000 ? 200 : 500)
        this.setState({ bidAmount: newValue })
    }
    dec = () => {
        let value = this.state.bidAmount
        if (value <= this.props.player.baseBidAmount) return;
        let newValue = value - (value <= 0 ? value : value <= 1000 ? 100 : value <= 2000 ? 200 : 500)
        this.setState({ bidAmount: newValue })
    }

    teamUpdated = () => {
        //console.log("data", this.state.data);
        //this.setState({ playerSold: false })
        let data = this.state.data[0];
        if(data.name !== undefined)
        {
            return (
                <div className='cardBlink'>
                    <div /* className='container' */>
                        Player Name : <strong> {data.name} </strong> <br />
                        Sold To : <strong> {data.soldTo} </strong> <br />
                        Bid Amount : <strong> {this.state.bidAmount} </strong>
                    </div>
                </div>
            )
        }
    }

    AssignToTeam = () => {
        const player = this.props.player;
        //console.log("player",player);
        let team = this.state.selected;
        player.soldTo = team.teamName;
        player.bidAmount = this.state.bidAmount;
        team.purseRemaining = team.purseRemaining - this.state.bidAmount;
        
        if (!team.playersTaken.includes(player.name)) {
            team.playersTaken.push(player.name)
            // console.log(player)
            //data1.data.success ? this.teamUpdated() : this.teamNotUpdated()

            axios.put(`/player/update/${player.email}`, player)
                .then((response) => {
                    //console.log(response)
                    if (!response.data.success) {
                        //alert('Failed');
                    }
                    else {
                        //alert('Success');
                    }
                })
                .catch((error) => {
                    console.log("Internal Server Error !!")
                })
            axios.put(`/team/update/${team.email}`, team)
                .then((response) => {
                    //console.log(response)
                    if (!response.data.success) {
                        //alert('Failed');
                    }
                    else {
                        //alert('Success');
                    }
                })
                .catch((error) => {
                    console.log("Internal Server Error !!")
                })
        }
        axios.get(`/player/${player.email}`)
            .then((response) => {
                const data = response.data;
                //console.log(data)
                if (data[0].soldTo !=="None") {
                    //console.log("Player Data", data);
                    //this.teamUpdated(data);
                    this.setState({ playerSold: true })
                    this.setState({ data: data })
                }
            })
            .catch(() => {
                console.log("Data Not Received");
            });

    }

    /*async AssignToTeam() {
        try {
            const player = this.props.player
            let team = this.state.selected

            player.soldTo = team.email

            team.purseRemaining = team.purseRemaining - this.state.bidAmount
            team.playersTaken.push(player.email)

            const url = "http://localhost:8080"
            const data1 = await axios.put(url + '/players/update/' + player.email, player)
            const data2 = await axios.put(url + '/teams/update/' + team.email, team)
            this.setState({team: data2});

            {console.log("data",data1,data2)}
            {data1.data.success ? this.teamUpdated() : this.teamNotUpdated()}
        }catch(error){
        }
    }*/

    heading = (player) => {
        return (
            <div className='center'>
                <br/>
                <div className="head">Welcome to Auction Arena!</div>
                <br />
                <div >
                    <div className='card'>
                        Name : {player.name} <br/>
                        Base Amount : {player.baseBidAmount} 
                    </div>
                </div>
                <br />
            </div>
        )
    }
    soldOption = () => {
        return (
            <div>
                <br />
                {/* + ans - buttons */}
                <h1 className="counter">{this.state.bidAmount}</h1>     <br />
                <button onClick={this.inc} className="btn1"><h1>+</h1></button>
                <button onClick={this.dec} className="btn2"><h3>-</h3></button>
                <br/><br/>

                <button className='submit_btn'
                    onClick={() =>
                        this.setState({ priceFixed: true })
                    }
                >     <h2>Sold To </h2>
                </button>
            </div>
        )
    }

    render() {
        const player = this.props.player
        return (
            <div className="center">
                {this.heading(player)}
                <div>
                    {this.state.priceFixed ?
                        (this.state.teamFixed && !this.state.playerSold) ?
                            this.AssignToTeam()
                            // window.location.href = '/Adminpage'
                            : this.teamList()
                        : this.soldOption()
                    }
                </div>

                <div>{this.teamUpdated()}</div>

                {/* {!this.state.priceFixed && !this.state.teamFixed && this.soldOption()}
                {this.state.priceFixed && !this.state.teamFixed && this.teamList()}
            {this.state.priceFixed && this.state.teamFixed && this.AssignToTeam()} */}
                <br />
            </div>

        );
    }
}

export default Auction;
import React, {Compenont} from 'react'
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: '',
      city: '',
      temperature: ''
    }

  }

  getCity() {
    var xhr1 = new XMLHttpRequest();
    var log = function () {

    }
    xhr1.open('GET',"//weixin.jirengu.com/weather/ip",false);

    var getCity = function (data) {
      var xhr1 = new XMLHttpRequest();
      var ip = JSON.parse(data).data
      var cityId = '//weixin.jirengu.com/weather/cityid?location=' + ip
      log(cityId)
      xhr1.open('GET',cityId);
      xhr1.onreadystatechange = function(){
        if (xhr1.readyState == 4 && xhr1.status == 200 || xhr1.status == 304) {
          getWeather.call(this, xhr1.response)
        }
      }
      xhr1.send()
    }
    var _this = this
    var getWeather = function (data) {
      var xhr1 = new XMLHttpRequest();
      log(JSON.parse(data))
      var city = JSON.parse(data).results[0].name
      var id = JSON.parse(data).results[0].id
      var cityId = 'http://weixin.jirengu.com/weather/now?cityid=' + id
      xhr1.open('GET',cityId,false);
      xhr1.onreadystatechange = function(){
        if (xhr1.readyState == 4 && xhr1.status == 200 || xhr1.status == 304) {
          var data = JSON.parse(xhr1.response)
          _this.setState({
            city: city,
            weather: data.weather[0].now.text,
            temperature: data.weather[0].now.temperature
          })
        }
      }
      xhr1.send()
    }
    xhr1.onreadystatechange = function(){
      if (xhr1.readyState == 4 && xhr1.status == 200 || xhr1.status == 304) {
        log(xhr1.response)
        getCity(xhr1.response)
      }
    }
    xhr1.send();
  }

  componentDidMount() {
    this.getCity()
  }
  render() {
    return (
        <div>
          <p>城市：{this.state.city}</p>
        </div>
    )
  }
}
export default Weather
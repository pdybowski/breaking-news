import View from '../../shared/view'

import './sport.css'

export class SportView extends View {
  render(countries, leagues, teams) {
    const div = document.createElement('div')
    const selectCountryElement = document.createElement('select')
    const selectLeagueElement = document.createElement('select')
    const ulElement = document.createElement('ul')
    document.addEventListener('input', this.leagueShow.bind(this), false)
    selectCountryElement.className = 'country'
    countries.countries.forEach((countryItem) => {
      const listItem = this.createListItem(countryItem)
      selectCountryElement.appendChild(listItem)
    })

    selectLeagueElement.className = 'league'
    leagues.leagues.forEach((countryItem) => {
      const listItem = this.createListItem(countryItem)
      selectLeagueElement.appendChild(listItem)
    })

    ulElement.className = 'teams'

    teams.teams.forEach((team) => {
      const teamItem = this.createTeamItem(team)
      ulElement.appendChild(teamItem)
    })

    div.appendChild(selectCountryElement)
    div.appendChild(selectLeagueElement)
    div.appendChild(ulElement)

    return div.outerHTML
  }

  leagueShow(e) {
    if (e.target.className !== 'country') return
    const name = e.target.value
    const selectedCountry = document.querySelector(
      `option[data-country-name="${name}"]`
    )

    const selectedCountryId = selectedCountry.dataset.id
    console.log(selectedCountryId)
  }

  createListItem(countryData) {
    const { countryId, name, countryCode, continent } = countryData

    const listItem = document.createElement('option')
    listItem.className = 'country__item'
    listItem.dataset.id = countryId
    listItem.dataset.countryName = name

    const html = `${name}`

    listItem.innerHTML = html

    return listItem
  }
  createTeamItem(team) {
    const { logo = '', name } = team

    const listItem = document.createElement('li')
    listItem.className = 'team__item'

    const html = `
      <header class="team__header">
        <img src="${logo}" alt="">
        <h2 class"team__title">${name}</h2>
      </header>
    `

    listItem.innerHTML = html

    return listItem
  }
}

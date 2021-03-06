import ContentProvider from '../../shared/contentProvider'
import Countries from './countries'
import Leagues from './leagues'
import SeasonList from './seasonList'
import Season from './season'
import MatchesList from './matchesList'
import Match from './match'

export class SportContentProvider extends ContentProvider {
  constructor(api, view) {
    super(api, view)
    this.seasonListModel = new SeasonList()
    this.matchesListModel = new MatchesList()
    this.supportedCountries = new Countries()
    this.supportedLeagues = new Leagues()
  }

  getTitle() {
    return 'Sport'
  }

  getHeaderText() {
    return 'Sport'
  }

  async getContent() {
    try {
      let { data: seasons = [] } = await this.api.fetch(
        'seasons',
        'league_id',
        '237'
      )

      const seasonsArray = []
      for (const season of Object.values(seasons)) {
        seasonsArray.push(season)
      }

      let { data: matches = [] } = await this.api.fetch(
        'matches',
        'season_id',
        '352',
        'date_from',
        '2020-09-11',
        'date_to',
        '2021-05-24'
      )

      const matchesArray = []
      for (const match of Object.values(matches)) {
        matchesArray.push(match)
      }
      this.seasonListModel.addSeason(
        seasonsArray.map((item) => new Season(item))
      )
      this.matchesListModel.addMatch(
        matchesArray.reverse().map((item) => new Match(item))
      )

      return this.view.render(
        this.supportedCountries,
        this.supportedLeagues,
        this.seasonListModel,
        this.matchesListModel
      )
    } catch (err) {
      return this.view.renderError('Sport data could not be fetched.')
    }

    return ''
  }
}

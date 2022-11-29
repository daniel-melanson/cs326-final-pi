const URL = 'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json';

const ROOM_EVENTS_SEARCH_PARAMS = new URLSearchParams([
  ['compsubject', 'rm_rsrv'],
  ['start_dt', '2022-11-28T00:00:00'],
  ['end_dt', '2022-11-28T23:59:59'],
  ['order', 'asc'],
  ['sort', 'event_name'],
  ['page', '1'],
  ['obj_cache_accl', '0'],
  ['space_id', '94'],
  ['caller', 'pro-ListService.getData'],
]);

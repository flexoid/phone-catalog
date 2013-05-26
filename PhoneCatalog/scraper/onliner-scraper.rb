# encoding: utf-8

require 'rubygems'
require 'mechanize'
require 'JSON'
require 'pry'
require 'ruby-progressbar'

class Scraper < Mechanize

  FIELDS = {
    'Date' => 'Дата выхода',
    'Type' => 'Тип',
    'OS' => 'Операционная система',
    'Processor' => 'Процессор',
    'Clock' => 'Тактовая частота',
    'Length' => 'Длина',
    'Width' => 'Ширина',
    'Thickness' => 'Толщина',
    'Weight' => 'Вес',
    'ScreenSize' => 'Размер экрана',
    'Resolution' => 'Разрешение экрана',
    'CameraPixelCount' => 'Количество пикселей матрицы',
    'BatteryCapacity' => 'Емкость аккумулятора'
  }

  PAGE_URL = 'http://catalog.onliner.by/mobile/section/~fp[mobile_type][0]=smartphone~add=0~sort_by=best~dir=asc~where=actual~currency=USD~city=minsk~page={PAGE}/'
  TOTAL_PAGES = 30
  PER_PAGE = 15

  def process
    pics_agent = Mechanize.new
    pics_agent.user_agent_alias = 'Mac Safari'

    FileUtils.rm_r 'images'
    FileUtils.mkdir_p 'images'

    bar = ProgressBar.create(:title => "Phones", total: TOTAL_PAGES * PER_PAGE, format: '%t: %c/%C %p%% |%B| %e')

    file = ::File.new('phones.json', 'w')

    (1..30).each do |page_number|
      #puts "Processing page #{page_number}"

      transact do
        get PAGE_URL.gsub('{PAGE}', page_number.to_s)

        details_links = page.search('form[@name=product_list] table tr td.pimage a').map do |mobile_a|
          mobile_a.attributes['href'].value
        end

        nbsp = Nokogiri::HTML("&nbsp;").text

        details_links.each do |link|
          transact do
            get link

            data = {}
            data['Make'] = page.search('.b-filtersellers-path a')[-1].text
            data['Model'] = page.search('h1').text.gsub('Смартфон ', '').gsub("#{data['Make']} ", '')
            data['ImageUrl'] = page.search('.ppimage img')[0].attributes['src'].value

            pics_agent.get(data['ImageUrl']).save_as "images/#{data['ImageUrl'].split('/')[-1]}"
            data['ImageUrl'] = data['ImageUrl'].split('/')[-1]

            data_table = page.search('.pdtable')
            data_rows = data_table.search('tr.pline2')
            FIELDS.each do |field|
              row = data_rows.find { |row| row.text =~ /#{field[1]}/ }
              if row
                col = row.search('td')[-1]
                data.merge!(field[0].to_s => col.text.gsub(nbsp, ' ').strip)
              end
            end
            file.puts(data.to_json)
            bar.increment
          end
        end
      end
    end
    file.close
    bar.finish
  end
end

Scraper.new.process

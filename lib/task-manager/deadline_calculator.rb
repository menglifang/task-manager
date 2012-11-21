module TaskManager
  module DeadlineCalculator
    def calculate_deadline(type, opts)
      type = convert(type)

      beginning = Time.now.send("beginning_of_#{type}")
      beginning.months_since(opts[:deadline_month] || 0).
        days_in_month(opts[:deadline_day] || 0).
        since(opts[:deadline_hour] * 60 * 60).
        since(opts[:deadline_minute] * 60)
    end

    private
    def convert_type(type)
      return :day if type == :daily

      type.to_s.gsub(/ly/, '').to_sym
    end
  end
end
